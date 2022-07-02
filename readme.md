create env: appcenter codepush deployment add -a <ownerName>/<appName> Staging

[App Center Management] (https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli#app-management)

Commands

Run Application
yarn android - Development
yarn android:stage - Staging
android:prod - Production

Create Build
yarn android:release - Development
android:stage-release - Staging
android:prod-release - Production

Codepush Release

Release Android in the current version mentioned in build.gradle
cp:android - Development
cp:android:stage - Staging
cp:android:prod - Production

Release for a Specific version
cp:android -- -t "3.1" -Development
cp:android:stage -- -t "3.1" -Staging
cp:android:prod -- -t "3.1" -Production
