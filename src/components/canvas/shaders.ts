export const paperVertShader = `
varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Subtle page wave animation (sin wave on Y axis)
  pos.y += sin(pos.x * 2.0 + uTime * 0.5) * 0.05;
  pos.z += sin(pos.y * 2.0 + uTime * 0.5) * 0.02;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const paperFragShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorShadow;

// Paper grain noise shader
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  
  float grain = noise(uv * 800.0 + uTime * 0.1) * 0.04;
  float scratch = step(0.998, noise(uv * vec2(1.0, 300.0))) * 0.06;
  float vignette = smoothstep(0.4, 1.0, length(uv - 0.5));
  
  vec3 baseColor = mix(uColorBase, uColorShadow, vignette * 0.5);
  vec3 finalColor = baseColor - vec3(grain + scratch) - (vignette * 0.1);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;
