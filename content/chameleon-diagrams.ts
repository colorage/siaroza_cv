export const chameleonPipelineEn = `flowchart TD
  merchant["Merchant picks colors<br/>and illustration style"]
  vector{"Flat vector?"}
  vars["Recolor with theme variables"]
  blender["Build in Blender<br/>primary plus secondary"]
  iterate["Iterate the color pair"]
  matrix["Render 16x16 matrix"]
  postfix["Name with 0-F postfix"]
  load["Store loads matching PNG"]
  merchant --> vector
  vector -->|yes| vars
  vector -->|no| blender
  blender --> iterate --> matrix --> postfix --> load
`;

export const chameleonPipelineBy = `flowchart TD
  merchant["Мерчант выбірае колеры<br/>і стыль ілюстрацый"]
  vector{"Плоскі вектар?"}
  vars["Перафарбаваць<br/>пераменнымі тэмы"]
  blender["Зрабіць у Blender<br/>primary і secondary"]
  iterate["Ітэраваць пару колераў"]
  matrix["Рэндэр матрыцы 16x16"]
  postfix["Імя з постфіксам 0-F"]
  load["Крама падцягвае PNG"]
  merchant --> vector
  vector -->|так| vars
  vector -->|не| blender
  blender --> iterate --> matrix --> postfix --> load
`;

export const chameleonPostfixEn = `flowchart TD
  primary["Primary 0-F"]
  secondary["Secondary 0-F"]
  file["shopping_cart_a2.png"]
  theme["Blue-Amber theme"]
  primary --> file
  secondary --> file
  file --> theme
`;

export const chameleonPostfixBy = `flowchart TD
  primary["Primary 0-F"]
  secondary["Secondary 0-F"]
  file["shopping_cart_a2.png"]
  theme["Тэма Blue-Amber"]
  primary --> file
  secondary --> file
  file --> theme
`;
