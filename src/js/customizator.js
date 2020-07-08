export default class Customizator {
    constructor() {
        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');

        this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
        
    }

    onScaleChange(e) {
        let scale;
        const body = document.querySelector('body');
        if (e.target) {
            scale = e.target.value.replace(/x/g, "");
        }

        function recursy(element) {
            element.childNodes.forEach(node => {
                if (node.nodeName === '#text' && node.nodeValue.replace(/\s/g, "" ).length > 0){

                    if (!node.parentNode.getAttribute('data-fz')){
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        node.parentNode.setAttribute('data-fz', +value.replace(/px/g,""));
                        node.parentNode.style.fontSize =  node.parentNode.getAttribute('data-fz') * scale + "px";
                    }else {
                        node.parentNode.style.fontSize =  node.parentNode.getAttribute('data-fz') * scale + "px";
                    }
                   
                }else {
                    recursy(node);
                }
            });
        }

        recursy(body);
    }

    render() {
        

        let scaleInputSmall = document.createElement('input'),
            scaleInputLarge = document.createElement('input'),
            panel = document.createElement('div');
        
        panel.append(this.btnBlock, this.colorPicker);

        console.log(this.btnBlock, scaleInputSmall, scaleInputLarge);

        scaleInputSmall.classList.add('scale_btn');
        scaleInputLarge.classList.add('scale_btn');
        this.btnBlock.classList.add('scale');
        this.colorPicker.classList.add('color');

        scaleInputSmall.setAttribute('type', 'button');
        scaleInputLarge.setAttribute('type', 'button');
        scaleInputSmall.setAttribute('value', '1x');
        scaleInputLarge.setAttribute('value', '1.5x');
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');

        this.btnBlock.append(scaleInputSmall, scaleInputLarge);

        panel.classList.add('panel');

        document.querySelector('body').append(panel);
    }
}