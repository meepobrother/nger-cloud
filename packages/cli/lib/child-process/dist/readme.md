```ts
import { spawnStreaming } from '@nger/cli.child-process'
spawnStreaming(`ls`, ['-a'], { pkg: 'demo' }, 'child')
spawnStreaming(`ls`, ['-a'], { pkg: 'demo' }, 'child4')
spawnStreaming(`ls`, ['-a'], { pkg: 'demo' }, 'child5')
spawnStreaming(`ls`, ['-a'], { pkg: 'demo' }, 'child6')
spawnStreaming(`ls`, ['-a'], { pkg: 'demo' }, 'child7')
spawnStreaming(`ls`, ['-a'], { pkg: 'demo' }, 'child8')
spawnStreaming(`ls`, ['-a'], { pkg: 'demo' }, 'child9')
```