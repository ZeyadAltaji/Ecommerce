import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



    // const menuBtn = document.querySelector<HTMLButtonElement>('meun-btn');
    // const closebtn=document.querySelector<HTMLButtonElement>('close-btn');
    // const sidebar = document.querySelector<HTMLElement>('aside');

    // menuBtn?.addEventListener('click', () => {
    //   sidebar!.style.display = 'block';
    // });

    // closebtn?.addEventListener('click', () => {
    //   sidebar!.style.display = 'none';
    // });


