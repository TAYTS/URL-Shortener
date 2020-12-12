package com.example.urlshortener

import com.example.urlshortener.controllers.URLRequest
import com.example.urlshortener.entities.URLReference
import com.example.urlshortener.services.URLReferenceService
import com.google.gson.Gson
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.postForEntity
import org.springframework.http.HttpEntity
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class URLReferenceControllerTests(
    @Autowired val testTemplate: TestRestTemplate,
    @Autowired val mockMvc: MockMvc
) {

    @MockkBean
    private lateinit var urlRefService: URLReferenceService

    @Test
    fun `Should return empty list if there is no URL reference record in database`() {
        every { urlRefService.getAllURLReferenceByCreatedAtDesc() } returns listOf<URLReference>()

        mockMvc.perform(get("/url").accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(content().json("[]", true))
    }

    @Test
    fun `Should return all the URL reference record in database`() {
        val urlRef1 = URLReference(id = 1, originalURL = "http://www.google.com", URLHash = "test-url-hash1")
        val urlRef2 = URLReference(id = 2, originalURL = "http://www.facebook.com", URLHash = "test-url-hash2")

        every { urlRefService.getAllURLReferenceByCreatedAtDesc() } returns listOf<URLReference>(urlRef1, urlRef2)

        mockMvc.perform(get("/url").accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("\$.length()").value(2))
            .andExpect(jsonPath("\$.[0].originalURL").value(urlRef1.originalURL))
            .andExpect(jsonPath("\$.[0].URLHash").value(urlRef1.URLHash))
            .andExpect(jsonPath("\$.[1].originalURL").value(urlRef2.originalURL))
            .andExpect(jsonPath("\$.[1].URLHash").value(urlRef2.URLHash))
    }

    @Test
    fun `Should return status code NOT_FOUND with non-exist url hash`() {
        val mockURLHash = "test-url-hash"
        every { urlRefService.getURLReference(mockURLHash) } returns null

        mockMvc.perform(get("/url/$mockURLHash").accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `Should return URL reference record with valid url hash`() {
        val mockURLHash = "test-url-hash"
        val urlRef = URLReference(id = 1, originalURL = "http://www.google.com", URLHash = mockURLHash)
        every { urlRefService.getURLReference(mockURLHash) } returns urlRef

        mockMvc.perform(get("/url/$mockURLHash").accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("\$.originalURL").value(urlRef.originalURL))
            .andExpect(jsonPath("\$.URLHash").value(urlRef.URLHash))
    }

    @Test
    fun `Should return status code BAD_REQUEST for invalid request body`() {
        val mockURL = "invalid url"
        val requestPayload: String = Gson().toJson(URLRequest(url = mockURL))
        val urlRef = URLReference(originalURL = "", URLHash = "")
        every { urlRefService.createURLReference(mockURL) } returns urlRef

        mockMvc.perform(
            post("/url")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestPayload)
        )
            .andExpect(status().isBadRequest)
    }

    @Test
    fun `Should return newly created URL reference record`() {
        val mockURL = "http://www.google.com"
        val mockURLHash = "test-url-hash"
        val requestPayload: String = Gson().toJson(URLRequest(url = mockURL))
        val urlRef = URLReference(originalURL = mockURL, URLHash = mockURLHash)

        every { urlRefService.createURLReference(mockURL) } returns urlRef

        mockMvc.perform(
            post("/url")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestPayload)
        )
            .andExpect(status().isCreated)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("\$.originalURL").value(urlRef.originalURL))
            .andExpect(jsonPath("\$.URLHash").value(urlRef.URLHash))
    }

    @Test
    fun `Should return newly created URL reference record with invalid field in request body`() {
        val mockURL = "http://www.hello.com"
        val mockURLHash = "test-url-hash"

        data class RequestPayload(
            val url: String,
            val testField: String
        )

        val urlRef = URLReference(originalURL = mockURL, URLHash = mockURLHash)

        every { urlRefService.createURLReference(mockURL) } returns urlRef

        val request = HttpEntity<RequestPayload>(RequestPayload(url = mockURL, testField = "test-field"))
        val entity = testTemplate.postForEntity<URLReference>("/url", request, URLReference::class)
        assertThat(entity.statusCode).isEqualTo(HttpStatus.CREATED)
        assertThat(entity.headers.contentType).isEqualTo(MediaType.APPLICATION_JSON)
        assertThat(entity.body!!.originalURL).isEqualTo(urlRef.originalURL)
        assertThat(entity.body!!.URLHash).isEqualTo(urlRef.URLHash)
    }
}
