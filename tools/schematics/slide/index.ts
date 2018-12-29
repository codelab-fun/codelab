import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';

export default function(schema: any): Rule {
  console.log("schema", schema);
  return chain([
    externalSchematic('@schematics/angular', 'component', {
      name: schema.name,
      project: schema.project
    })
  ]);
}
