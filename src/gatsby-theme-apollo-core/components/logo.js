import React from 'react';
import styled from '@emotion/styled';
import {ReactComponent as PerfectyIcon} from '../../../static/images/perfecty-logo.svg';

const Wrapper = styled.div({
    display: 'flex',
    fontSize: 24
});

const StyledDocsIcon = styled(PerfectyIcon)({
    height: '50px',
    width: '200px'
});

export default function Logo() {
    return (
        <Wrapper>
            <StyledDocsIcon />
        </Wrapper>
    );
}
