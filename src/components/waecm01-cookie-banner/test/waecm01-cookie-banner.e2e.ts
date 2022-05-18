import { newE2EPage } from '@stencil/core/testing';

describe('waecm01-cookie-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<waecm01-cookie-banner></waecm01-cookie-banner>');

    const element = await page.find('waecm01-cookie-banner');
    expect(element).toHaveClass('hydrated');
  });
});
