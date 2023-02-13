import { Component, ElementRef, AfterViewInit } from '@angular/core';
// @ts-ignore
import { InteractivePlayer, HalEditor, doEdit} from '@ml/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title:string = 'Episode 84: Paris - Visite du Marais';
  interactivePlayer:InteractivePlayer;
  halEdit: HalEditor;

  constructor(public element: ElementRef){
    // let rootEl = this.element.nativeElement;
    this.interactivePlayer = new InteractivePlayer({mediaProvider: "duo-fr"});
  }

  async ngAfterViewInit(){
    // after app mount, bind behaviors the interactive elements with plain JavaScript
    let container = this.element.nativeElement;
    // container.classList += "flex-bottom flex-block";
    container.classList += "flex-container fill-parent";
    container.parentElement.classList += "flex-container"
    // // @ts-ignore
    // window.check = this.element;

    try {
      // load audio stream
      let src = await this.interactivePlayer.loadMedia();
      // const id = "single-spa-application:@ml/marais";
      const switch_lang = container?.querySelector("#set_lang");
      switch_lang?.addEventListener("click", (ev:MouseEvent)=>{
        this.interactivePlayer.toggleLangVisibility(ev, 'hide-en');
      })

      // play or edit, but we're not using angular/router
      if (doEdit()) {
        this.halEdit = new HalEditor(this.interactivePlayer.config);
        this.halEdit.toggleEdit(true, (isEditing:boolean)=>{
          // ???: does this still work? 
          // now we are replaying clips directly. when do we call toggleEdit()?
          this.interactivePlayer.playMediaOnClick(isEditing);
        });
      }
      else {
        this.interactivePlayer.playMediaOnClick();
      }
    } catch (err) {
      console.error(err)
    }
  }
}
