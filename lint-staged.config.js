const commands = ['npm run affected:lint:write', 'npm run format:write'];

const pattern = `{libs,apps}/!(code-demos/assets)**/*.{ts,json,md,html,?(s)css}`;

module.exports = {
  [pattern]: commands,
};
