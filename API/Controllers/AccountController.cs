using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(
    UserManager<AppUser> userManager,
    ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await userManager.Users.AnyAsync(x => x.UserName == registerDto.Username.ToLower()))
            return BadRequest("Username is already taken");

        if (await userManager.Users.AnyAsync(x => x.Email == registerDto.Email.ToLower()))
            return BadRequest("Email address is already taken");

        var user = new AppUser
        {
            UserName = registerDto.Username.ToLower(),
            Email = registerDto.Email.ToLower(),
            DisplayName = registerDto.DisplayName
        };

        var result = await userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("identity", error.Description);
            }

            return ValidationProblem();
        }

        await SetRefreshTokenCookie(user);

        return await CreateUserDto(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await userManager.Users
            .FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Invalid username");

        var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result) return Unauthorized("Invalid password");

        await SetRefreshTokenCookie(user);

        return await CreateUserDto(user);
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<UserDto>> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (refreshToken == null) return NoContent();

        var user = await userManager.Users.FirstOrDefaultAsync(x =>
            x.RefreshToken == refreshToken &&
            x.RefreshTokenExpiry > DateTime.UtcNow);

        if (user == null) return Unauthorized();

        await SetRefreshTokenCookie(user);

        return await CreateUserDto(user);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        var username = User.GetUsername();

        await userManager.Users
            .Where(x => x.UserName == username)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(x => x.RefreshToken, _ => null)
                .SetProperty(x => x.RefreshTokenExpiry, _ => null));

        Response.Cookies.Delete("refreshToken");

        return Ok();
    }

    private async Task SetRefreshTokenCookie(AppUser user)
    {
        var refreshToken = tokenService.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(14);

        await userManager.UpdateAsync(user);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(14)
        };

        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }

    private async Task<UserDto> CreateUserDto(AppUser user)
    {
        return new UserDto
        {
            Username = user.UserName!,
            DisplayName = user.DisplayName,
            Email = user.Email!,
            Token = await tokenService.CreateToken(user)
        };
    }
}