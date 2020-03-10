# usePromises

**React and React Native hook to consume a Promise (similar to useEffect) with full TypeScript support**

## Installation

npm install --save usepromises

or

yarn add usepromises

## Usage / Examples

### usePromise

```javascript
import { usePromise } from 'usepromises';

...

interface SampleResponse {
  slideshow: {
    title: string
  }
}

function Example() {
  const response = usePromise<SampleResponse>(async () => {
    const response = await fetch('https://httpbin.org/json');
    return response.json();
  }, []);

  return (
    <div>
      {response.isResolved && response.value.slideshow.title}

      {response.isRejected ? `Error: ${response.error}` : null}
    </div>
  );
};
```

### useMountPromise

```javascript
import { useMountPromise } from 'usepromises';

...

interface SampleResponse {
  slideshow: {
    title: string
  }
}

function Example() {
  const [response, setResponse] = useState<SampleResponse>();
  useMountPromise(async () => {
    const response = await fetch('https://httpbin.org/json');
    setResponse(response.json());
  });

  ...
};
```

### useUnmountPromise

```javascript
import { useUnmountPromise } from 'usepromises';

...

interface SampleResponse {
  slideshow: {
    title: string
  }
}

function Example() {
  useUnmountPromise(async () => {
    const response = await fetch('https://httpbin.org/json');
    console.warn('Server status code:', response.status);
  });

  ...
};
```
