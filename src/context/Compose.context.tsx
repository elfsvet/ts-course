import React, { ReactNode, FC } from 'react';

interface IComposeContext {
  components?: FC<{ children?: ReactNode }>[];
  children?: ReactNode | undefined;
}

export default function ComposeContext({ components = [], children }: IComposeContext) {
  // nesting component into each other like : <a><b><c>...<n></n>...</c></b></a>
  return (
    <>
      {components.reduceRight((acc, Comp: any) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
