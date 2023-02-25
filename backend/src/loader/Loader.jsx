import {MagnifyingGlass} from 'react-loader-spinner';
export const LoaderComponent = () => {
  return (
    <>
     <MagnifyingGlass
  visible={true}
  height="100"
  width="80"
  ariaLabel="MagnifyingGlass-loading"
  wrapperStyle={{}}
  wrapperClass="MagnifyingGlass-wrapper"
  glassColor = '#c0efff'
  color = '#e15b64'
/>
    </>
  );
};