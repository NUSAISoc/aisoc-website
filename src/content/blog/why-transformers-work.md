---
title: "Why Do Transformers Work? An Intuitive Explanation"
author: "David Tan"
date: "2026-01-28T12:00:00Z"
excerpt: "Forget the math for a moment. Let's build an intuition for why attention-based architectures have dominated machine learning."
tags: ["transformers", "theory", "opinion"]
---

## Beyond the Equations

When I first learned about transformers, I was overwhelmed by the matrix multiplications, the layer normalization, and the positional encodings. But once I stepped back and asked "why does this work?", the pieces started falling into place.

## The Core Insight: Context is Everything

Human language is fundamentally about relationships. The word "bank" means something different in "river bank" versus "investment bank". Transformers are really good at one thing: figuring out which words should pay attention to which other words.

### The Old Way: Sequential Processing

RNNs and LSTMs processed text one word at a time, like reading a book left to right. The problem? By the time you reach the end of a long sentence, you've forgotten the beginning.

### The Transformer Way: Everything at Once

Transformers look at all words simultaneously and learn which pairs of words are important to each other. It's like having a photographic memory for the entire text.

## Why Attention Scales

The self-attention mechanism is embarrassingly parallel. Unlike RNNs, which must process tokens sequentially, transformers can process all tokens at once on a GPU. This is why we can train models on trillions of tokens.

## A Simple Mental Model

Think of attention as a spotlight. For each word in your input, the model shines spotlights on all other words, with brightness proportional to relevance. The output for each word is a weighted sum of all words, weighted by these spotlight intensities.

---

_This is an opinion piece. The views expressed are my own attempts to build intuition and may not be technically precise._
