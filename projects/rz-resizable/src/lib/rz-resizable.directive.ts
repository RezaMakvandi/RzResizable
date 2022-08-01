import { AfterContentInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[RzResizable]'
})
export class RzResizableDirective implements AfterContentInit {
  resizeStarted:boolean = false;
  public mouse!: {x: number, y: number}
  rect!:{bottom: number, height: number, left: number, right: number, top: number, width: number, x: number, y: number}
  direction_temp : string = ''
  direction_const : string = ''
  constructor(private el:ElementRef, private renderer:Renderer2) {  }
  ngAfterContentInit(): void {
    this.rect = this.el.nativeElement.getBoundingClientRect();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = { x: event.clientX, y: event.clientY };
    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.direction_temp = ''
    if(this.mouse.x >= (this.rect.x + this.rect.width - 6) && this.mouse.x <= (this.rect.x + this.rect.width + 6)){
      this.direction_temp = 'right'
    }
    else if(this.mouse.x >= (this.rect.x - 6) && this.mouse.x <= (this.rect.x + 6)){
      this.direction_temp = 'left'
    }
    else if(this.mouse.y >= (this.rect.y - 6) && this.mouse.y <= (this.rect.y + 6)){
      this.direction_temp = 'top'
    }
    else if(this.mouse.y >= (this.rect.y + this.rect.height - 6) && this.mouse.y <= (this.rect.y + this.rect.height + 6)){
      this.direction_temp = 'bottom'
    }

    this.setBorders(this.direction_temp)
    if(this.resizeStarted){
      this.direction_const = (this.direction_temp != '')? this.direction_temp : this.direction_const
      this.resize(this.direction_const)
    }
    
  }
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent){
    this.resizeStarted = true;
  }
  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent){
    this.resizeStarted = false;
    this.direction_const = ''
    this.renderer.setStyle(document.body,'cursor','context-menu')
  }
  resize(direction:string){
    this.rect = this.el.nativeElement.getBoundingClientRect();
    if(direction === 'right' ){
      this.renderer.setStyle(this.el.nativeElement, 'width', Number(this.mouse.x > this.rect.left) 
        ? this.mouse.x - this.rect.left + 'px' 
        : '0px'
      )
    }
    else if( direction === 'left'){
      this.renderer.setStyle(this.el.nativeElement, 'width', Number(this.mouse.x < this.rect.right) 
        ? this.rect.right - this.mouse.x  + 'px' 
        : '0px'
      )
    }
    else if(direction === 'bottom'){
      this.renderer.setStyle(this.el.nativeElement, 'height',  Number(this.mouse.y > this.rect.top) 
        ? this.mouse.y - this.rect.top + 'px' 
        : '0px'
      )
    }
    else if(direction === 'top' ){
      this.renderer.setStyle(this.el.nativeElement, 'height',  Number(this.mouse.y < this.rect.bottom) 
        ? this.rect.bottom - this.mouse.y  + 'px' 
        : '0px'
      )
    }
 
  }

  setBorders(direction:string){
    switch (direction) {
      case 'right':
        this.renderer.setStyle(this.el.nativeElement, 'border','none')
        this.renderer.setStyle(this.el.nativeElement, 'border-right','1px dashed green')
        this.renderer.setStyle(document.body, 'cursor','e-resize')
        break;
      case 'left':  
        this.renderer.setStyle(this.el.nativeElement, 'border','none')
        this.renderer.setStyle(this.el.nativeElement, 'border-left','1px dashed green')
        this.renderer.setStyle(document.body, 'cursor','e-resize')
        break;
      case 'top':  
        this.renderer.setStyle(this.el.nativeElement, 'border','none')
        this.renderer.setStyle(this.el.nativeElement, 'border-top','1px dashed green')
        this.renderer.setStyle(document.body, 'cursor','n-resize')
        break;
      case 'bottom':  
        this.renderer.setStyle(this.el.nativeElement, 'border','none')
        this.renderer.setStyle(this.el.nativeElement, 'border-bottom','1px dashed green')
        this.renderer.setStyle(document.body, 'cursor','n-resize')
        break;
      default:
        this.renderer.setStyle(this.el.nativeElement, 'border','none')
        this.renderer.setStyle(document.body, 'cursor','context-menu')
        break;
    }
  }


}
