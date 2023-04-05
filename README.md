# Action

This action generates an image using the [OpenAI Image Generation API](https://platform.openai.com/docs/guides/images/image-generation-beta).

## Usage
Create a workflow (eg: `.github/workflows/generate-image.yml`). See [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

<!-- 
### PAT(Personal Access Token)

You will need to [create a PAT(Personal Access Token)](https://github.com/settings/tokens/new?scopes=admin:org) that has `admin:org` access.

Add this PAT as a secret so we can use it as input `github-token`, see [Creating encrypted secrets for a repository](https://docs.github.com/en/enterprise-cloud@latest/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository). 
### Organizations

If your organization has SAML enabled you must authorize the PAT, see [Authorizing a personal access token for use with SAML single sign-on](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on).
-->

#### Example
```yml
name: Image Generation
on:
  issue_comment:
    types: [created]

jobs:
  run:
    if: ${{ startsWith(github.event.comment.body, '/image') }}
    name: Run Action
    runs-on: ubuntu-latest
    steps:
      - id: prompt
        uses: actions/github-script@v3
        with:
          script: return context.payload.comment.body.replace('/image', '').trim()
      - id: generate-image
        uses: austenstone/openai-image-generation@main
        with:
          openai-api-key: ${{ secrets.OPENAI_API_KEY }}
          prompt: ${{ steps.prompt.outputs.result }}
      - run: gh api repos/${{ github.repository }}/issues/${{ github.event.issue.number }}/comments -f body="![image](${{ steps.generate-image.outputs.image }})"
        env:
          GH_TOKEN: ${{ github.token }}
```

## ➡️ Inputs
Various inputs are defined in [`action.yml`](action.yml):

| Name | Description | Default |
| --- | - | - |
| github&#x2011;token | Token to use to authorize. | ${{&nbsp;github.token&nbsp;}} |

<!-- 
## ⬅️ Outputs
| Name | Description |
| --- | - |
| output | The output. |
-->

## Further help
To get more help on the Actions see [documentation](https://docs.github.com/en/actions).
