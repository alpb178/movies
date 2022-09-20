import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import RightSidebar from '../sidebar/RightSidebar';

export default function FormSidebarRight({ children, open, onOpen }) {
  const { t } = useTranslation('common');
  const [title, setTitle] = useState();

  return (
    <RightSidebar open={open} onOpen={onOpen}>
      <SimpleBar style={{ maxHeight: '100%' }} className="h-full">
        <div className="h-full px-8 pb-8">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              //  setErrorsForm(errors);
              //  setTouchedForm(touched);
              return React.cloneElement(child, { onOpen });
            }
            return child;
          })}
        </div>
      </SimpleBar>
    </RightSidebar>
  );
}
