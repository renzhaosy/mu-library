---
nav:
  title: 组件
  path: /components
group:
  title: 通用
toc: false
---

# Button

## Demo

```tsx
import React from 'react';
import { Button } from 'mudesign';

export default () => <Button  >test</Button>;
```

## loading

```tsx
import React from 'react';
import { Button } from 'mudesign';

export default () => {
  return <div>
  <Button   loading={true} style={{
    marginRight: '30px'
  }}>测试测试测试</Button>
  <Button size='lg'  loading={true} style={{
    marginRight: '30px'
  }}>测试测试测试</Button>
  <Button size='sm'   loading={true} style={{
    marginRight: '30px'
  }}>测试测试测试</Button>
  </div>
}
```


## type

```tsx
import React from 'react';
import { Button } from 'mudesign';

export default () => {
  return <div>

  <Button type='primary' style={{
    marginRight: '30px'
  }}>测试测试测试</Button>

  <Button  type='secondary' style={{
    marginRight: '30px'
  }}>测试测试测试</Button>

  <Button type='default' style={{
    marginRight: '30px'
  }}>测试测试测试</Button>
  </div>
}
```