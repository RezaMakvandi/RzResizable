# RzResizable

Resizable directive for Angular 14+  
To resize any element

# Install

```
npm install rz-resizable 
```
After install, import RzResizableModule in your app.module.ts file

```javascript
{
...
import { RzResizableModule } from 'rz-resizable';
  
  @NgModule({
  imports: [
    RzResizableModule
  ],
  ...
})

```
How it works:

```html
<div style="width:300px; height:100px; background-color:#c8f7fd" RzResizable></div>
```    

![alt text](https://github.com/RezaMakvandi/RzResizable/tree/master/projects/rz-resizable/demo.png?raw=true)                                     |