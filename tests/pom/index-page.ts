import type { Locator, Page } from '@playwright/test'

export class IndexPage {
  readonly page: Page
  readonly introductionSectionLocator: Locator
  readonly techStackSectionLocator: Locator
  readonly experienceSectionLocator: Locator
  readonly openSourceSectionLocator: Locator
  readonly activitiesSectionLocator: Locator
  readonly darkModeToggleBtnLocator: Locator

  constructor(page: Page) {
    this.page = page
    this.introductionSectionLocator = page.getByTestId('introduction')
    this.techStackSectionLocator = page.getByTestId('tech-stack')
    this.experienceSectionLocator = page.getByTestId('experience')
    this.openSourceSectionLocator = page.getByTestId('open-source')
    this.activitiesSectionLocator = page.getByTestId('activities')
    this.darkModeToggleBtnLocator = page.getByRole('button', {
      name: /(라이트|다크) 모드로 전환/,
    })
  }

  async toggleDarkMode() {
    await this.darkModeToggleBtnLocator.click()
  }

}