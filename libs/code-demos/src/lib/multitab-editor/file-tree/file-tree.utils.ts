export interface FileFolderNode {
  name: string;
  children: FileFolderNode[];
  path: string;
}

/**
 * Mutates the rootNode by adding the file/folder as children
 * to the proper node found matching the path given.
 *
 * @param rootNode - the top most node parent to or higher than all nodes in the given paths
 * @param allPaths - collection of files or folders paths to add to the branches of the rootNode
 */
export function createFolderStructure(
  rootNode: FileFolderNode[],
  allPaths: string[]
) {
  allPaths.forEach(path => {
    let currentNode = rootNode; // reset to highest node always for path deduping

    path.split('/').forEach(name => {
      const existingNode = currentNode.find(node => node.name === name);

      if (existingNode) {
        currentNode = existingNode.children;
      } else {
        const newNode = {
          name,
          children: [],
          path: path
        };

        currentNode.push(newNode);
        currentNode = newNode.children;
      }
    });
  });
}


export function getIconType(node: FileFolderNode) {
  if (node.path.endsWith('.ts')) {
    return 'typescript';
  }

  if (node.path.endsWith('.html')) {
    return 'html';
  }

  if (node.path.endsWith('.css')) {
    return 'stylesheet';
  }

  return 'unknown';
}