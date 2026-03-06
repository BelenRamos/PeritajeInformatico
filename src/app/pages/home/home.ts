import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const canvas: any = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    const letters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops: number[] = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    function draw() {
    
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      ctx.fillStyle = "#805c78";
      ctx.font = fontSize + "px monospace";
    
      for (let i = 0; i < drops.length; i++) {
    
        const text = letters[Math.floor(Math.random()*letters.length)];
    
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
    
        drops[i]++;
      }
    }
    
    setInterval(draw, 33);
    // --- NUEVA LÓGICA PARA REVEAL ---
    const observerOptions = {
      threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const targets = document.querySelectorAll('.reveal');
    targets.forEach(target => observer.observe(target));

    
  }

}