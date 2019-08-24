# How To Publish

## install tool

```shell
npm install vsce -g
```

## package to local vsix file

```shell
vsce package
```

## vsce publish patch

1.0.1 -> 1.0.2

```shell
vsce publish patch
```

## publish minor

1.0.7 -> 1.1.0

```shell
vsce publish minor
```

## publish major

1.3.5 -> 2.0.0

```shell
vsce publish major
```

## publish with custom version

```shell
vsce publish 2.3.6
```
