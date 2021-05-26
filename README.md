# Micro Atomic Design

Micro Atomic DesignはAtomic Designの考え方を、ページ（必ずしも一画面とは限りません）毎にAtomic Designの構成を紐づけて開発する方法です。


## ディレクトリ構造

```
presentation
 ┝ containers
 │ └ search
 │   ├ context
 │   ├ hooks
 │   ├ flux
 │   ├ atoms
 │   ├ molecules
 │   ├ organisms
 │   ├ pages
 │   ├ index.tsx
 │   └ style.tsx
 └ reactor
 ```