import { writeFile } from 'node:fs/promises';

export async function connect(port = 9241) {
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find(t => t.type === 'page');
  if (!target) throw new Error('Blockbench page is not available.');
  const socket = new WebSocket(target.webSocketDebuggerUrl), pending = new Map();
  let sequence = 0;
  const events = [];
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id) {events.push(message); return;}
    const item = pending.get(message.id);
    if (!item) return;
    clearTimeout(item.timer); pending.delete(message.id);
    if (message.error) item.reject(new Error(JSON.stringify(message.error))); else item.resolve(message.result);
  });
  await new Promise((resolve, reject) => {socket.addEventListener('open', resolve, {once: true}); socket.addEventListener('error', reject, {once: true});});
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => {pending.delete(id); reject(new Error(`Timed out: ${method}`));}, 60000);
      pending.set(id, {resolve, reject, timer}); socket.send(JSON.stringify({id, method, params}));
    });
  }
  await send('Runtime.enable');
  return {send, events, close: () => socket.close(), async evaluate(expression) {
    let response;try{response = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true, userGesture: true});}catch(error){throw new Error(error.message+'\nExpression: '+expression.slice(0,300));}
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text);
    return response.result.value;
  }, async screenshot(path) {const result = await send('Page.captureScreenshot', {format: 'png'}); await writeFile(path, Buffer.from(result.data, 'base64'));}};
}

if (process.argv[1]?.endsWith('cdp.mjs')) {
  const client = await connect();
  try {console.log(JSON.stringify(await client.evaluate(process.argv[2]), null, 2));} finally {client.close();}
}
