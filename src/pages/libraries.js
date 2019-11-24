import React from "react"
import MainLayout from "../components/MainLayout"

export default ({ data, location }) => {
  return (
    <MainLayout location={location}>
      <section>
        <h3 class="mb-3 text-new"></h3>
        <ul>
          <li id="{{.name}}" class="clearfix mb-3">
            <div>《 .name 》-.author</div>
            <div class="text-muted">简述：.description</div>

            <div class="text-muted tags mb-3">
              关键词：.tag<a rel="bookmark"></a>
            </div>
            <a
              class="btn btn-outline-primary float-right btn-sm"
              href="/libraries/{{.path}}"
              target="_blank"
              rel="contents"
            >
              Download / Read
            </a>
          </li>
        </ul>
      </section>
    </MainLayout>
  )
}
