import { ExternalLink } from "~/components/external-link"
import { Heading } from "~/components/heading"
import { Text } from "~/components/text"

export default function PostAdmin() {
  return (
    <>
      <Heading>About me</Heading>
      <Text>
        I'm a full stack software engineer working at{" "}
        <ExternalLink to="https://patrainc.jp/">PATRA Inc.</ExternalLink> in
        Tokyo. I have a strong passion for programming, and especially frontend
        development (web and Flutter). In my free time I love to watch Netflix,
        play games, and hang out with loved ones. I also enjoy studying
        Japanese. I passed the JLPT N1 in 2020, but I still have a long ways to
        go towards true fluency.
      </Text>

      <Heading className="mb-2">Links</Heading>
      <ul className="ml-8 list-disc">
        <li>
          <ExternalLink to="https://github.com/ekerik220">Github</ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.linkedin.com/in/evan-kerik/">
            LinkedIn
          </ExternalLink>
        </li>
      </ul>
    </>
  )
}
