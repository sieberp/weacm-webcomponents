import { newSpecPage } from '@stencil/core/testing';
import { Waecm01CookieBanner } from '../waecm01-cookie-banner';

describe('waecm01-cookie-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Waecm01CookieBanner],
      html: `<waecm01-cookie-banner></waecm01-cookie-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <waecm01-cookie-banner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </waecm01-cookie-banner>
    `);
  });
});
