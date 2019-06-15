import { log } from 'three';

const THREE = require('three');
export default class TathvaText {
    create_text(font) {
        var geometry = new THREE.TextGeometry("TATHVA '19", {
            font : font,
            size : screen.width * 0.09,
            height:10,
            bevelEnabled: false,
            curveSegments: 10    
        });
        this.obj = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(0xffffff));

    }
}