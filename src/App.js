import React from 'react'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                memes : [],
                currentText : {
                    top : "",
                    bottom : ""
                }
        }
        this.handleInput = this.handleInput.bind(this)
        this.insertText = this.insertText.bind(this)   
    }

    handleInput(e){
        
        e.preventDefault()
        console.log(e.target.id)
        console.log(e.target.value)
 
        if(e.target.id === "top"){
            const top = e.target.value
            this.setState({
                  currentText : {
                       top : top,
                       bottom : this.state.currentText.bottom
                     } 
            })
        }  
        if(e.target.id === "bottom"){
            const bottom = e.target.value
            this.setState({
                  currentText : {
                       top : this.state.currentText.top,
                       bottom : bottom
                     } 
            })
        }    
     
    }
    
   
    draw() {    
        var ctx = document.getElementById('canvas').getContext('2d')
        var img = new Image()
        var f = document.getElementById("uploadimage").files[0]
        var url = window.URL || window.webkitURL
        var src = url.createObjectURL(f);
        img.src = src;
        img.onload = function(){
        ctx.drawImage(img,0,0);
        url.revokeObjectURL(src);
         }
         
    }

    insertText(top, bottom){
        console.log(top.length, bottom.length)
        
         
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'black';
        ctx.font = "50px Arial";
        ctx.miterLimit = 3;
        ctx.lineJoin = 'circle';
        ctx.lineWidth = 7;
        ctx.strokeText(top, (canvas.width/2)-(top.length*12), 50);
        ctx.strokeText(bottom, (canvas.width/2)-(bottom.length*12), 580);
        ctx.fillStyle = 'white';
        ctx.lineWidth = 4;
        ctx.fillText(top, (canvas.width/2)-(top.length*12), 50);
        ctx.fillText(bottom, (canvas.width/2)-(bottom.length*12), 580);
        
    }

    downloadImg(){
           var link = document.createElement('a');
           link.download = 'filename.png';
           link.href = document.getElementById('canvas').toDataURL()
           link.click();
    }
    
    render(){
        return(
            <div className="main">
                <header>Meme generator</header>
                 <div className="container">
                    <div className="left-c">
                        <p>Do magic</p>
                        <input type='file' onChange={this.draw} name='img' size='65' id='uploadimage' /><br></br>
                        <input className="inp" type="text" id="top"  onChange={this.handleInput} value={this.state.currentText.top} placeholder="top..." /><br></br>
                        <input className="inp"  type="text" id="bottom" onChange={this.handleInput} value={this.state.currentText.bottom} placeholder="bottom..." /><br></br><br></br>
                        <button onClick = {()=>this.insertText(this.state.currentText.top,this.state.currentText.bottom)}>Generate meme</button><br></br>
                        <button onClick={this.downloadImg}>Download meme</button>
                    </div>
                    <div className="right-c">
                        <p>Your Meme</p>
                        <canvas id="canvas" height="620" width="620"></canvas>              
                    </div>
                 </div>
            </div>
        )
    }
}

export default App