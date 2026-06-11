import { inject, Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messages = signal<ToastMessage[]>([]);
  
  show(message: string, type: ToastMessage['type'] = 'info') {
    const toast: ToastMessage = {
      id: Date.now(),
      message,
      type
    };

    this.messages.update(messages => [...messages, toast]);

    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  remove(id: number) {
    this.messages.update(messages => messages.filter(x => x.id !== id));
  }
}