// Canonical vertices consumed by triangleFit, in Bedrock model coordinates.
export const triangleVertices=[[0,.5,0],[-.5,-.5,0],[.5,-.5,0]];

// Texture V is trail age, measured from the top of the image. Both triangles
// share the same diagonal UVs; neighbouring strips share the same cross-section.
export const segmentUvs=(newer,older)=>[
  [[0,newer],[1,newer],[0,older]],
  [[1,newer],[1,older],[0,older]],
];
