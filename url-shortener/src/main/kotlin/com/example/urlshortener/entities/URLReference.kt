package com.example.urlshortener.entities

import java.time.LocalDateTime
import javax.persistence.*


@Entity()
@Table(name = "url_reference")
class URLReference(
    @Id @GeneratedValue(strategy = GenerationType.AUTO) @Column(name = "ID")
    var id: Int,
    @Column(name = "ORIGINAL_URL", nullable = false) var originalURL: String,
    @Column(name = "URL_HASH", unique = true, nullable = false) var URLHash: String,
    @Column(
        name = "CREATED_AT",
        nullable = false,
    ) var createdAt: LocalDateTime = LocalDateTime.now(),
)
