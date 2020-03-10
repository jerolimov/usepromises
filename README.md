# usePromise

**React and React Native hook to consume a Promise (similar to useEffect) with full TypeScript support**

### Installation

npm install --save @jerolimov/usepromise

or

yarn add @jerolimov/usepromise

### Usage / Example

```javascript
import { usePromise } from '@jerolimov/usepromise';

...

interface SampleResponse {
  slideshow: {
    title: string
  }
}

function Example() {
  const response = usePromise<SampleResponse>(async () => {
    const response = await fetch('https://httpbin.org/json')
    return response.json()
  }, [])

  return (
    <div>
      {response.isResolved && response.value.slideshow.title}

      {response.isRejected ? `Error: ${response.error}` : null}
    </div>
  );
};
```
