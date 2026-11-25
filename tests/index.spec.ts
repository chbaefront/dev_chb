import { expect, test } from '@playwright/test'
import { IndexPage } from './pom/index-page.js'

test.describe('index page tests', () => {

  let indexPage: IndexPage

  test.beforeEach(async ({ page }) => {
    indexPage = new IndexPage(page)
    await page.goto(`/`)
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/배창현/g)
  })

  test('dark mode', async ({ page }) => {
    await indexPage.toggleDarkMode()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  test('section visible', async ({ page }) => {
    await expect(indexPage.introductionSectionLocator).toBeVisible()
    await expect(indexPage.techStackSectionLocator).toBeVisible()
    await expect(indexPage.experienceSectionLocator).toBeVisible()
    await expect(indexPage.openSourceSectionLocator).toBeVisible()
    await expect(indexPage.activitiesSectionLocator).toBeVisible()
  })
})