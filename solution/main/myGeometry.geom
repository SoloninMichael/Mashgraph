#version 330 core

#define float2 vec2
#define float3 vec3
#define float4 vec4
#define float4x4 mat4
#define float3x3 mat3

uniform float4x4 projectionMatrix;
uniform float4x4 modelViewMatrix;

uniform float3 g_camPos;

layout (lines) in;
layout (line_strip, max_vertices = 2) out;

in float3 vertWorldPos [];
in float3 vertFrontColor [];

out float3 fragmentWorldPos;
out float3 fragmentNormal; 
out float3 fragmentFrontColor;

void main ()
{
  float3 A = vertWorldPos[0];
  float3 B = vertWorldPos[1];
 
  // optimize this mult, do it once, on the CPU, not for each triangle!
  //
  float4x4 modelViewProjectionMatrix = projectionMatrix*modelViewMatrix;
  
  gl_Position = modelViewProjectionMatrix*float4(A,1);
  fragmentFrontColor = vertFrontColor[0];
  fragmentWorldPos   = A;
  fragmentNormal     = -vertWorldPos[0];
  EmitVertex();

  gl_Position = modelViewProjectionMatrix*float4(B,1);
  fragmentFrontColor = vertFrontColor[1];
  fragmentWorldPos = B;
  fragmentNormal = -vertWorldPos[1];
  EmitVertex();
  
  EndPrimitive();
}


