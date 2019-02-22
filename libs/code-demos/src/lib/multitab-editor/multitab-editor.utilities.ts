export interface FileFolder {
  name: string;
  children: FileFolder[];
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
  rootNode: FileFolder[],
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

