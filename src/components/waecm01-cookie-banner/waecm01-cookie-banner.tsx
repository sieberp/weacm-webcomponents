import { Component, Host, h, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'waecm01-cookie-banner',
  styleUrl: 'waecm01-cookie-banner.css',
  shadow: true,
})
export class Waecm01CookieBanner {
  @Prop({ attribute: 'application-name' }) name: string;

  @Prop({ attribute: 'policy-link' }) link: string;

  @State() cookies: string[];

  @Event({ eventName: 'on-accept' }) onAccept: EventEmitter<string[]>;

  connectedCallback() {
    const savedCookies = window.localStorage.getItem('accepted-cookies');
    if (savedCookies) {
      this.cookies = JSON.parse(savedCookies);
    } else {
      this.cookies = ['notwendige'];
    }
  }

  private onAcceptHandler(cookies: string[]) {
    this.onAccept.emit(cookies);
  }

  handleCookieChange(cookie: string) {
    if (this.cookies.includes(cookie)) {
      this.cookies = this.cookies.filter(oldCookie => oldCookie !== cookie);
    } else {
      this.cookies = [...this.cookies, cookie];
    }
  }

  handleAccept = () => {
    this.onAcceptHandler(this.cookies);
    window.localStorage.setItem('accepted-cookies', JSON.stringify(this.cookies));
  };

  // componentWillRender() {
  //   const savedCookies = window.localStorage.getItem('accepted-cookies');
  //   if (savedCookies) {
  //     this.cookies = JSON.parse(savedCookies);
  //   }
  // }

  render() {
    return (
      <Host>
        <div class="wrapper">
          <p>
            Um Ihnen den bestmöglichen Service zu gewährleisten speichert {this.name} personenbezogene Daten. Beachten Sie die <a href={this.link}>Datenschutz-Richtlinie</a>.
          </p>
          <ul class="selection_container">
            <li class="selection_element">
              <label id="funk">Funktionelle Cookies:</label>
              <div tabIndex={0} class={'switch'} data-checked={true} role="checkbox" aria-checked={true} aria-disabled={true} aria-labeledby="funk">
                <div class="handle" />
              </div>
            </li>
            <li class="selection_element">
              <label id="stat">Statistische Cookies:</label>
              <div
                tabIndex={0}
                class={'switch'}
                data-checked={this.cookies.includes('statistische')}
                onClick={() => this.handleCookieChange('statistische')}
                role="checkbox"
                aria-checked={this.cookies.includes('statistische')}
                aria-labeledby="stat"
                onKeyDown={e => {
                  if (e.key === ' ') this.handleCookieChange('statistische');
                }}
              >
                <div class="handle" />
              </div>
            </li>
            <li class="selection_element">
              <label htmlFor="mark">Marketing Cookies:</label>
              <div
                tabIndex={0}
                class={'switch'}
                data-checked={this.cookies.includes('marketing')}
                onClick={() => this.handleCookieChange('marketing')}
                role="checkbox"
                aria-checked={this.cookies.includes('marketing')}
                aria-labeledby="stat"
                onKeyDown={e => {
                  if (e.key === ' ') this.handleCookieChange('marketing');
                }}
              >
                <div class="handle" />
              </div>
            </li>
          </ul>
          <div class="button_container">
            <button onClick={() => (this.cookies = ['notwendige', 'statistische', 'marketing'])}>Accept All</button>
            <button onClick={() => (this.cookies = ['notwendige'])}>Dismiss All</button>
            <button onClick={this.handleAccept}>Accept</button>
          </div>
        </div>
      </Host>
    );
  }
}
