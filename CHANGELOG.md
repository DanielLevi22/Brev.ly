## [1.0.1](https://github.com/DanielLevi22/Brev.ly/compare/v1.0.0...v1.0.1) (2025-06-28)


### Bug Fixes

* correct Dockerfile for workspace dependencies ([778fa8e](https://github.com/DanielLevi22/Brev.ly/commit/778fa8e53627ecb7595b0197d6199595bd59edf3))

# 1.0.0 (2025-06-28)


### Bug Fixes

* add migration scripts and fix CI pipeline ([d6ed06d](https://github.com/DanielLevi22/Brev.ly/commit/d6ed06d52b30bb01bb967e4b0a9871f0634c5efa))
* correct error handling in frontend and backend - Fix never type error in create-link controller - Fix incorrect error property access in frontend - Ensure backend error messages are properly displayed ([48f9a7d](https://github.com/DanielLevi22/Brev.ly/commit/48f9a7d78e713ffc554e9cb486bbb7fef69cc7a1))
* **dev:** persist database data and prevent data loss on dev startup ([8bed5b4](https://github.com/DanielLevi22/Brev.ly/commit/8bed5b4e689286a3af7ff5743e05b311576e2b5c))
* prevent blue background on short url input with browser autocomplete ([c73f990](https://github.com/DanielLevi22/Brev.ly/commit/c73f990189c43d145703f316db24b1340f3c0cf9))
* remove type case ([988f12e](https://github.com/DanielLevi22/Brev.ly/commit/988f12e31415b8db1e745534ab9efe9154e20a6f))
* resolve access counter update issue with window focus refetch ([9dd32c6](https://github.com/DanielLevi22/Brev.ly/commit/9dd32c6bf62ba4d1f31c00a915652e3f413b7aaf))


### Features

* add 404 not found page and improve routing structure ([f43be43](https://github.com/DanielLevi22/Brev.ly/commit/f43be4335d70c0ceb84312246c2a6edcfdcc73cb))
* **seo:** add advanced SEO with react-helmet-async, structured data, sitemap and robots.txt\n\n- Integrate react-helmet-async for meta tags and Open Graph\n- Add SEO components for Home, Redirect and Not Found pages\n- Implement JSON-LD structured data for website and organization\n- Add dynamic sitemap and robots.txt for better indexing\n- Improve sharing and discoverability on Google and social networks\n- Fix all TypeScript warnings and errors related to SEO ([c20c81c](https://github.com/DanielLevi22/Brev.ly/commit/c20c81c515d9961df2dc6e1d7fb593354bbbb5bb))
* add animated loading bar and spinner for links list ([d839bd7](https://github.com/DanielLevi22/Brev.ly/commit/d839bd79c97dc7dd715ccd6ad97f0a90de7126e1))
* add environment configuration for flexible domain management ([a2d4776](https://github.com/DanielLevi22/Brev.ly/commit/a2d477628b694940d135a9ad47e397cb4800d1d3))
* add new button icon ([abfc828](https://github.com/DanielLevi22/Brev.ly/commit/abfc8285f9d76bdce2da9123c9841a525c12d2bf))
* add new button variants ([503b226](https://github.com/DanielLevi22/Brev.ly/commit/503b2265299bde0ed088503db29471599e674907))
* add teste a create link ([768ead6](https://github.com/DanielLevi22/Brev.ly/commit/768ead651113b3ce0c8fa8c786864993dc1aa936))
* add use case delete link ([9fee878](https://github.com/DanielLevi22/Brev.ly/commit/9fee878467087575072c06939204009e86431879))
* creat use case increment acess count ([90d3f67](https://github.com/DanielLevi22/Brev.ly/commit/90d3f67cad88ce7b8d512de459d7e7b4042bbeca))
* create components page home ([e60de4b](https://github.com/DanielLevi22/Brev.ly/commit/e60de4b3b3a68042a2882a3b46d23842ff763a1d))
* create get original url use case ([7bdf758](https://github.com/DanielLevi22/Brev.ly/commit/7bdf758a71e6dca500aadfc691671ae160316361))
* create make factories createLink ([4ba89de](https://github.com/DanielLevi22/Brev.ly/commit/4ba89deba37f086f02c7966ac44c050d70482a59))
* create new input ([be3711c](https://github.com/DanielLevi22/Brev.ly/commit/be3711cdbf8b2441fd745a1557bb11027035123d))
* create test e2e ([1d8531b](https://github.com/DanielLevi22/Brev.ly/commit/1d8531b5d8d34bde1f59010031b846db8bb1cd32))
* create use case  list all links ([22be053](https://github.com/DanielLevi22/Brev.ly/commit/22be0534a614c794a6c35817ac4e0130872c327b))
* create use case create csv report ([1c38cab](https://github.com/DanielLevi22/Brev.ly/commit/1c38cabef03b2183f01869e1a44b49107bbeff4f))
* gera e disponibiliza relatório CSV dos links via endpoint /links/report ([2bed64e](https://github.com/DanielLevi22/Brev.ly/commit/2bed64e10ea8d471709d228dca44ce5e4e70a9eb))
* implement skeleton loading for better UX ([4e7781d](https://github.com/DanielLevi22/Brev.ly/commit/4e7781d900715938d5b20e9875881980352e0ae0))
* ordena os links por data de criação (mais recentes primeiro) na listagem ([3387d93](https://github.com/DanielLevi22/Brev.ly/commit/3387d93906e89f60ed9331b8d049d749df40a624))
