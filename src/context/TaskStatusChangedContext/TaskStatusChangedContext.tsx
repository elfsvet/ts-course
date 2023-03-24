import React, { createContext, FC, PropsWithChildren, ReactElement, useState } from 'react';

export const TaskStatusChangedContext = createContext({
  // default value
  // like state but global
  updated: false,
  // like setState but global
  toggle: () => {}
});

export const TaskStatusChangedContextProvider: FC<PropsWithChildren> = (props): ReactElement => {
  const [updated, setUpdated] = useState(false);

  const toggleHandler = () => {
    updated ? setUpdated(false) : setUpdated(true);
  };

  return (
    <TaskStatusChangedContext.Provider
      value={{
        // like state but global
        updated: updated,
        // like setState but global
        toggle: toggleHandler,
      }}
    >
      {props.children}
    </TaskStatusChangedContext.Provider>
  );
};
