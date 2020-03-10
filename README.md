# usePromise

## React and React Native hook to consume a Promise (similar to useEffect)

### Installation

npm install --save @jerolimov/usepromise

or

yarn add @jerolimov/usepromise

### Usage / Example

```javascript
import { usePromise } from '../.';

...

function Example() {
  const response = usePromise<SampleResponse>(async () => {
    const response = await fetch('https://httpbin.org/json')
    return response.json()
  }, [])

  return (
    <div>
      Example: {response.status === 'FULFILLED' && response.resolved.slideshow.title}
    </div>
  );
};
```
