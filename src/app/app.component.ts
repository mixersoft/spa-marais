import { Component, ElementRef, AfterViewInit } from '@angular/core';
// @ts-ignore
import { __load, __setLangVisibility, transcriptId } from '@ml/shared';
console.warn("@ml/marais: transcriptId=",  transcriptId ) // OK

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title:string = 'Episode 84: Paris - Visite du Marais';

  constructor(public element: ElementRef){
    // let rootEl = this.element.nativeElement;
  }

  ngAfterViewInit(){
    // after app mount, bind behaviors the interactive elements with plain JavaScript
    let container = this.element.nativeElement;
    // container.classList += "flex-bottom flex-block";
    container.classList += "flex-container fill-parent";
    container.parentElement.classList += "flex-container"
    // // @ts-ignore
    // window.check = this.element;

    try {
      // load audio stream
      __load()
      // bind and handle click event on slider, `__setLangVisibility` in scope here
      // const id = "single-spa-application:@ml/marais";
      const switch_lang = container?.querySelector("#set_lang");
      const transcript = container?.querySelector(`#${transcriptId}`);
      switch_lang?.addEventListener("click", (ev:MouseEvent)=>__setLangVisibility(ev, 'hide-en'))
    } catch (err) {
      console.error(err)
    }
  }
}
