import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contactos',
  imports: [],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css',
})
export class Contactos implements AfterViewInit, OnDestroy {
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
  
    // 1. Lógica de Matrix
    const initMatrix = (canvasId: string) => {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : 400;
  
      const letters = "0123456789";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops: number[] = Array(Math.floor(columns)).fill(1);
  
      const draw = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#483f79";
        ctx.font = fontSize + "px monospace";
  
        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };
      // Guardamos el intervalo para poder limpiarlo
      this.intervalId = setInterval(draw, 50);
    };
  
    initMatrix("matrix-contact-canvas");
  
    // 2. Lógica de Reveal (Para que se vean las secciones al bajar)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // Importante: Limpiar el intervalo cuando el usuario se va de la página
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
