precision mediump float;

varying vec2 v_texcoord;

uniform sampler2D u_texture;
uniform float time;
uniform vec2 stepSize;
uniform mat4 u_matrix;
uniform vec4 realDims;
uniform vec2 texDim;

void main() {
  vec2 uv = gl_FragCoord.xy;
  vec4 fragColor;
  vec2 step = vec2(stepSize.x, stepSize.y);
  float what = 0.667;

  // whoever inherits this code, I pity you
  
  bool xOver = v_texcoord.x < (realDims.x)/texDim.x || v_texcoord.x > (realDims.x+realDims.z)/texDim.x || v_texcoord.x - step.x > (realDims.x+realDims.z)/texDim.x || v_texcoord.x + step.x < (realDims.x)/texDim.x;

  if(v_texcoord.y > (realDims.y+realDims.a)/texDim.y) {
    if(v_texcoord.y - step.y > (realDims.y+realDims.a)/texDim.y || xOver) {
      discard;
    } else {
      float alpha = texture2D( u_texture, v_texcoord + vec2( 0.0, -step.y ) ).a;
      fragColor = vec4(1.0, 0.0, 0.0, alpha);
    }
  } else if(v_texcoord.y < (realDims.y)/texDim.y) {
    if(v_texcoord.y + step.y < (realDims.y)/texDim.y || xOver) {
      discard;
    } else {
      float alpha = texture2D( u_texture, v_texcoord + vec2( 0.0, step.y ) ).a;
      fragColor = vec4(1.0, 0.0, 0.0, alpha);
    }
  } else if(v_texcoord.x > (realDims.x+realDims.z)/texDim.x) {
    if(v_texcoord.x - step.x > (realDims.x+realDims.z)/texDim.x) {
      discard;
    } else {
      float alpha = texture2D( u_texture, v_texcoord + vec2( -step.x, 0.0 ) ).a;
      fragColor = vec4(1.0, 0.0, 0.0, alpha);
    }
  } else if(v_texcoord.x < (realDims.x)/texDim.x) {
    if(v_texcoord.x + step.x < (realDims.x)/texDim.x) {
      discard;
    } else {
      float alpha = texture2D( u_texture, v_texcoord + vec2( step.x, 0.0 ) ).a;
      fragColor = vec4(1.0, 0.0, 0.0, alpha);
    }
  } else {
    float alpha = 4.0*texture2D( u_texture, v_texcoord ).a;
    alpha -= texture2D( u_texture, v_texcoord + vec2( step.x, 0.0 ) ).a;
    alpha -= texture2D( u_texture, v_texcoord + vec2( -step.x, 0.0 ) ).a;
    alpha -= texture2D( u_texture, v_texcoord + vec2( 0.0, step.y ) ).a;
    alpha -= texture2D( u_texture, v_texcoord + vec2( 0.0, -step.y ) ).a;
    fragColor = vec4(1.0, 0.0, 0.0, alpha);
  }

  gl_FragColor = fragColor;
}