import ContentContainer from 'client/containers/content';
import HeaderComponent from 'client/components/header';
import PageContainer from 'client/containers/page';
import React from 'react';


/**
 *
 */
export default class HomePage extends React.Component {
  /**
   *
   */
  render(): React$Element {
    return (
      <PageContainer>
        <HeaderComponent />
        <ContentContainer>
          <div>Hi!</div>
        </ContentContainer>
      </PageContainer>
    );
  }
}
