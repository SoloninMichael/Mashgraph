#version 330

#define float2 vec2
#define float3 vec3
#define float4 vec4
#define float4x4 mat4
#define float3x3 mat3

uniform float4x4 projectionMatrix;
uniform float4x4 modelViewMatrix;

in float4 vertex;
in float3 normal;
in float2 texCoord;

out float3 vertWorldPos;
out float3 vertFrontColor;

uniform float timeParameter;
uniform int tri;




float3 my_morphing(float4 tmp) {
	
	float3 local_normal = normalize(tmp.xyz);

	float3 new_tmp = tmp.xyz;

	float k = 0.42 * tmp.w * sin(50*timeParameter*timeParameter+1) * cos(timeParameter*timeParameter*timeParameter); //* cos(304 * timeParameter); 

	new_tmp += k * local_normal;

	if (tri != 1)
		new_tmp += 0.33 * local_normal;
	return new_tmp;
}

void main(void)
{
		vertWorldPos = my_morphing(vertex); 

  vertFrontColor = float3(1,1,1);
}



