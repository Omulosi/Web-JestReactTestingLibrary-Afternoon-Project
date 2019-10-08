import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as rtl from '@testing-library/react';
import Counter from '../Counter';

let tools;

beforeEach(() => {
  rtl.cleanup();
  tools = rtl.render(<Counter user='Peter' />);
});

describe('Counter component', () => {
  it('can debug the output', () => {
    tools.debug();
  });

  it('shows the correct user', () => {
    const elementWithJoshText = tools.queryByText(/peter/i);
    expect(elementWithJoshText).toBeInTheDocument();
  });

  it('initial count is zero', () => {
    const elementWithZero = tools.queryByText(/0/);
    expect(elementWithZero).toBeInTheDocument();
  });

  it('can increment the count by one by clicking increment', () => {
    const incButton = tools.queryByTestId('incButton');

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/1/)).toBeInTheDocument();

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/1/)).not.toBeInTheDocument();
    expect(tools.queryByText(/2/)).toBeInTheDocument();
  });

  it('can decrement the count by one by clicking decrement', () => {
    const decButton = tools.queryByTestId('decButton');

    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/-1/)).toBeInTheDocument();
  });

  it('can reset the count clicking rest', () => {
    const reset = tools.queryByTestId('resetButton');

    rtl.fireEvent.click(reset);
    expect(tools.queryByText(/0/)).toBeInTheDocument();
  });

  it('prevents the count from going over an upper limit', () => {
    
    const incButton = tools.queryByTestId('incButton');

    for (let i = 0; i <= 100; i++) {
      if (i === 100) {
        rtl.fireEvent.click(incButton);
        expect(tools.queryByText(/101/)).not.toBeInTheDocument();
      }
    }
  });

  it('prevents the count from going under a lower limit', () => {
    // implement
    const decButton = tools.queryByTestId('decButton');
    for (let i = 0; i >= -100; i--) {
      if (i === -100) {
        rtl.fireEvent.click(decButton);
        expect(tools.queryByText(/-101/)).not.toBeInTheDocument();
      }
    }
  });

  it('shows a warning once we hit the upper limit of the counter', () => {
    // implement
    const incButton = tools.queryByTestId('incButton');
    for (let i = 0; i <= 100; i++) {
      if (i === 100) {
        rtl.fireEvent.click(incButton);
        expect(tools.queryByText(/That's as high as Peter's count will go/))
          .toBeInTheDocument();
      }
    }
  });

  it('shows a warning once we hit the lower limit of the counter', () => {
    // implement
    const decButton = tools.queryByTestId('decButton');
    for (let i = 0; i >= -100; i--) {
      if (i === -100) {
        rtl.fireEvent.click(decButton);
        expect(tools.queryByText(/That's as low as Peter's count will go/))
          .toBeInTheDocument();
      }
    }
  });
});
