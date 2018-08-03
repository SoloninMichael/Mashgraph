#version 330

#define float2 vec2
#define float3 vec3
#define float4 vec4
#define float4x4 mat4
#define float3x3 mat3

uniform float4x4 projectionMatrix;
uniform float4x4 modelViewMatrix;

in float3 fragmentWorldPos;
in float3 fragmentNormal;
in float3 fragmentFrontColor;

out float4 fragColor;

uniform float3 g_matAmbientColors[4];
uniform float3 g_matDiffuseColors[4];
uniform float3 g_matSpecularColors[4];

uniform float3 g_lightPos[2];
uniform float3 g_camPos;
uniform int LightType;
uniform int tri;

const float3 g_light = float3(50,100,0);
const float3 g_lightVAR = float3(-50,-100,-50);


void main(void)
{	
 
  float4 tmp;
  if(tri == 1)
	//float len = (fragmentWorldPos[0]*fragmentWorldPos[0] + fragmentWorldPos[1]*fragmentWorldPos[1] + fragmentWorldPos[2]*fragmentWorldPos[2]);
	tmp = float4(0.33*(abs(fragmentWorldPos[0]) + abs(fragmentWorldPos[1]) + abs(fragmentWorldPos[2])) / 1.9,0.40*(abs(fragmentWorldPos[0]) + abs(fragmentWorldPos[1]) + abs(fragmentWorldPos[2])) / 1.9,0.5*(abs(fragmentWorldPos[0]) + abs(fragmentWorldPos[1]) + abs(fragmentWorldPos[2])) / 0.9,1);
	//(fragmentWorldPos[0] + fragmentWorldPos[1] + fragmentWorldPos[2]) / 3.0
	//tmp = float4(lll, lll, lll, 1);
	//tmp = float4(0.33 * rand()%5, 0.90 * rand()%5, 0.92 * rand()%5, 1 );
	//tmp = float4(0.33, 0.90, abs(-0.92), 1 );
	//std::rand()%3;
  else 
	tmp = float4(0.74*(abs(fragmentWorldPos[0]) + abs(fragmentWorldPos[1]) + abs(fragmentWorldPos[2])) / 1.9,0.10*(abs(fragmentWorldPos[0]) + abs(fragmentWorldPos[1]) + abs(fragmentWorldPos[2])) / 1.9,0.1*(abs(fragmentWorldPos[0]) + abs(fragmentWorldPos[1]) + abs(fragmentWorldPos[2])) / 0.9,1);
	
	//tmp = float4(0.74,0.10,0.10,1);
	//tmp = float4(0.74*max(fragmentWorldPos[0], 0),0.10*max(fragmentWorldPos[1], 0),0.10*max(fragmentWorldPos[2], 0),1);
	float4 tmp1;
	//
	//Инвертирование нормали
	if (LightType == 1) {
		float3 l  = 1.3 * normalize (fragmentWorldPos - g_light );
		float3 v = normalize(g_camPos - fragmentWorldPos);
		float3 n = fragmentNormal;
 
		if(dot(v,n) <= 0.0f)
		  n *= (-1.0);
		tmp1 = tmp * max ( dot ( n, l ), 0.5 );
	}
	else if (LightType == 2) {
		float3 l  = 1.3 * normalize (fragmentWorldPos - g_lightVAR);
		float3 v = normalize(g_camPos - fragmentWorldPos);
		float3 n = fragmentNormal;
 
		if(dot(v,n) <= 0.0f)
		  n *= (-1.0);
		tmp1 = tmp *  max ( dot ( n, l ), 0.0 );
	}
	else if (LightType == 3) {
		float3 l1  = 1.3 * normalize (fragmentWorldPos - g_light );

		float3 v = normalize(g_camPos - fragmentWorldPos);
		float3 n = fragmentNormal;
 
		if(dot(v,n) <= 0.0f)
		  n *= (-1.0);
		tmp1 = tmp * max ( dot ( n, l1 ), 0.0 );
		float3 l2  = 1.3 * normalize (fragmentWorldPos - g_lightVAR);
		tmp1 += tmp *  max ( dot ( n, l2 ), 0.0 );
	}
	else
		tmp1 = tmp * 0.1f;

  fragColor = tmp1;
}








