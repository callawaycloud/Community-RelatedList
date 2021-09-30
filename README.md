# Related List

A simple component that is used in Experience Cloud to display a list of related records.

This LWC gives you the ability to specify specific fields to display on a related list.

This gives you more flexibility than the standard OOTB related list component in communities.

![Imgur](https://i.imgur.com/KIVfGVn.png)

## 📦 Install

**via sfdx-cli**
`sfdx force:package:install --package 04t5e000000aORGAA2 -u your@org.user`

**via url**
login and navigate to [`/packaging/installPackage.apexp?p0=04t5e000000aORGAA2`](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t5e000000aORGAA2). Choose `Install for: Admin Only`.

## 🔨 Usage

1. Add the class ``CommunityRelatedListHelper`` to the profile/permission set being used in the community
2. Go to your community in Experience cloud
3. Go to a record detail page
4. Drag the component ``Related List`` onto the page
5. Fill in the component parameters as needed

## ✨Features

### Specify your own fields and avoid page layouts

- Depending on the object, some page layouts require specific fields to be present. You can now specify your own fields to be displayed.

### Custom Section Label

- You have the ability to specify the label that will display for the section

### Section Icon

- You have the ability to choose an SLDS to display for the section

### Columns

- You have the ability to choose between 1 and 5 columns

### Custom Column Labels

- You have the ability to specify the label you want to display on a column

## Future Improvements

- Move the columns to custom metadata so we can have more configurations in place (how to display the field -- link, phone, email, etc...)
- Ability to filter on the related records

# Development

Pre-requisites:

1. Run `npm install`

To work on this project in a scratch org:

1. [Set up CumulusCI](https://cumulusci.readthedocs.io/en/latest/tutorial.html)
2. Run `cci service connect devhub --project` to connect to a devhub for this project.
3. Run `cci flow run dev_org --org dev` to create the dev scratch org and deploy this project.
4. Run `cci org browser dev` to open the org in your browser.
5. Run `cci flow run release_unlocked_beta --org dev` to upload a new beta version of the unlocked package.
   1. Create a new GitHub release tag for the new beta version.
   2. Generates release notes.
   3. Syncs feature branches with main branch.
6. Run `cci flow run ci_beta --org beta` to create a new scratch org and run test classes.
7. Run `cci flow run release_unlocked_production --org packaging` to promote a production release of your managed package.
   1. It promotes the most recent beta version (found in the project’s GitHub releases) to production status.
   2. Then, CumulusCI creates a new, production GitHub release, and aggregates release notes for that release.
8. Run `cci flow run ci_release --org release` to install the latest production release and run all test classes in a release scratch org.

** Powered by ** [Callaway Cloud Consulting](https://www.callawaycloud.com/)
