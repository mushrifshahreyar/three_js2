import { log } from 'three';

const THREE = require('three');
export default class TathvaText {
    create_text(font) {
        var geometry = new THREE.TextGeometry(
            "What started out as the brainchild\n"+
            "of a few curious minds, is now an\n" +
            "emotion carried by those in and out\n"+
            "of the college.\n" +
            "Designate yourself as the supporter \n"+
            "of this techno-managerial festival", {
                font: font,
                size: innerWidth * 0.03,
                height: 0,
                bevelEnabled: false,
                curveSegments: 1
            });
        this.obj = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(0x999999));

    }
}