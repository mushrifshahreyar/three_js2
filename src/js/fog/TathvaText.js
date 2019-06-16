import { log } from 'three';

const THREE = require('three');
export default class TathvaText {
    constructor() {
        this.uniforms = {
            time: {
                type: 'f',
                value: 0
            }
        };
    }
    create_text(font) {
        var geometry = new THREE.TextGeometry("TATHVA '19", {
            font: font,
            size: Math.log(innerWidth)*7.0 + 40.0,
            height: 10,
            bevelEnabled: false,
            curveSegments: 10
        });

        var material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: require('./glsl/tathvaText.vs').default,
            fragmentShader: require('./glsl/tathvaText.fs').default,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
        this.obj = new THREE.Mesh(geometry, material);

    }
    render(time) {
        this.uniforms.time.value += time;
    }
}